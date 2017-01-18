import Inferno from 'inferno';

const AppTemplate = ({ children, locale = 'en', title }) => (
  <html lang={locale}>
    <head>
      <meta charSet="utf-8"/>
      <title>{title}</title>
    </head>
    <body>
      <div id="application">
        {children}
      </div>
      <script type="text/javascript" src="/assets/client.js"></script>
    </body>
  </html>
);

export default AppTemplate;
