import { format as prettierFormat } from 'prettier';
import { parsers as prettierParsers } from 'prettier/plugins/html';

// Replace EJS expressions with base64 placeholders
const encodeEJS = (text) =>
  text.replace(/<%[\s\S]*?%>/g, (match, offset, input) => {
    const encoded = Buffer.from(match).toString('base64');
    return `___EJS__${encoded}__EJS___`;
  });

// Decode base64 placeholders back to EJS expressions
const decodeEJS = (text) =>
  text.replace(/___EJS__(.*?)__EJS___/g, (_, encoded) => {
    try {
      return Buffer.from(encoded, 'base64').toString();
    } catch {
      return '';
    }
  });

// Sort Tailwind class attributes
async function formatTailwindClasses(content, options) {
  const matches = [...content.matchAll(/class="([^"]+)"/g)];

  for (const match of matches) {
    const [fullMatch, classContent] = match;

    // EJS expressions are temporarily replaced with placeholders
    const ejsParts = [...classContent.matchAll(/___EJS__.*?__EJS___/g)];
    let tempClass = classContent;
    const placeholders = [];

    for (let i = 0; i < ejsParts.length; i++) {
      const placeholder = `__EJS_EXPR_${i}__`;
      placeholders.push(ejsParts[i][0]);
      tempClass = tempClass.replace(ejsParts[i][0], placeholder);
    }

    const formatted = await prettierFormat(`<el class="${tempClass}" />`, {
      ...options,
      parser: 'html',
      plugins: [require.resolve('prettier-plugin-tailwindcss')],
    });

    let sortedClass = formatted.match(/class="([^"]+)"/)?.[1] ?? tempClass;

    // Restore placeholders
    placeholders.forEach((original, i) => {
      sortedClass = sortedClass.replace(`__EJS_EXPR_${i}__`, original);
    });

    content = content.replace(fullMatch, `class="${sortedClass}"`);
  }

  return content;
}

async function parse(text, options, legacy) {
  const encoded = encodeEJS(text);
  const tailwinded = await formatTailwindClasses(encoded, options);
  let sorted = decodeEJS(tailwinded);

  const find = /(?:<(textarea|title|script).*?<\/\1|<\s*[a-zA-Z!](?:".*?"|.*?)*?[^%]>|<%([^>]*)%>)/gs;
  sorted = sorted.replace(find, (match, p1, p2) => (p2 ? `<!${p2}!>` : match));

  return prettierParsers.html.parse(sorted, options, legacy);
}

// 플러그인 설정
export const languages = [
  {
    name: 'EJS',
    parsers: ['html'],
    extensions: ['.ejs'],
  },
];

/** @type {Record<string, import('prettier').Parser>} */
export const parsers = {
  html: {
    ...prettierParsers.html,
    parse,
  },
};
