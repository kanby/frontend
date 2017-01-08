const Template = ({ body, locale, title }) => `<!DOCTYPE html>
<html lang=${locale || 'en'}>
  <head>
    <meta charSet="utf-8" />
    <title>${title}</title>
  </head>
  <body>
    <div id="application">
      ${body}
    </div>
    <script type="text/javascript" src="/assets/client.js"></script>
  </body>
</html>
`;

export default Template;
