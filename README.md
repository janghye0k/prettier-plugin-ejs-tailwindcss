# Prettier Plugin for EJS with TailwindCSS

A Prettier plugin that formats EJS templates and automatically sorts TailwindCSS classes within class attributes. Combine beautiful structure with consistent utility class order.

## Features

- **EJS Support**: Formats Embedded JavaScript (EJS) templates seamlessly.
- **TailwindCSS Class Sorting**: Automatically sorts TailwindCSS utility classes within `class` attributes.

## Installation

```bash
npm install --save-dev prettier-plugin-ejs-tailwindcss
```

To use this plugin, ensure you have `prettier` and `prettier-plugin-tailwindcss` installed in your project:

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

## Usage

Add the plugin to your Prettier configuration:

```json
{
  "plugins": ["prettier-plugin-ejs-tailwindcss"]
}
```

```json
{
  "overrides": {
    "files": "*.ejs",
    "options": {
      "parser": "html",
      "plugins": ["prettier-plugin-ejs-tailwindcss"]
    }
  }
}
```

Run Prettier as usual:

```bash
npx prettier --write "your-template.ejs"
```

## Example

### Input

```ejs
<div>
  <div><% if (condition) { %> <% } else if (condition) { %> <% } %></div>

  <div class="<%= red %>"><%= 1 > 0 %></div>

  <div class="items-center gap-4 flex">
    <code><%= text %></code>
    <pre><%= text %></pre>
  </div>
</div>
```

### Output

```ejs
<div>
  <div>
    <% if (condition) { %>
    <% } else if (condition) { %>
    <% } %>
  </div>

  <div class="<%= red %>"><%= 1 > 0 %></div>

  <div class="flex items-center gap-4">
    <code><%= text %></code>
    <pre><%= text %></pre>
  </div>
</div>

```

## Development

To build the project:

```bash
npm run build
```

## Acknowledgements

This project was inspired by and references the [prettier-plugin-ejs](https://github.com/ecmel/prettier-plugin-ejs) package. Special thanks to the contributors of that project for their work on EJS formatting.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/janghye0k/prettier-plugin-ejs-tailwindcss).

## Links

- [GitHub Repository](https://github.com/janghye0k/prettier-plugin-ejs-tailwindcss)
- [Issues](https://github.com/janghye0k/prettier-plugin-ejs-tailwindcss/issues)
- [Prettier Documentation](https://prettier.io/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
