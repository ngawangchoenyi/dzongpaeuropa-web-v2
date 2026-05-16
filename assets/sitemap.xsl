<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap - Dzongpa Europa</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            color: #24344d;
            background: #f7f4ee;
          }

          main {
            max-width: 1100px;
            margin: 0 auto;
            padding: 48px 20px;
          }

          h1 {
            margin: 0 0 12px;
            font-family: Georgia, serif;
            font-size: 36px;
            font-weight: 600;
            color: #1f3f68;
          }

          p {
            margin: 0 0 28px;
            color: #5f6670;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border: 1px solid #e4dccd;
          }

          th,
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #eee7da;
            text-align: left;
            vertical-align: top;
          }

          th {
            font-size: 13px;
            letter-spacing: .04em;
            text-transform: uppercase;
            color: #8b1e1e;
            background: #fbf8f1;
          }

          a {
            color: #1f3f68;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          .priority {
            width: 120px;
            color: #5f6670;
          }

          @media (max-width: 640px) {
            main {
              padding: 32px 14px;
            }

            h1 {
              font-size: 28px;
            }

            th,
            td {
              padding: 10px 8px;
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Sitemap</h1>
          <p>URLs publicas incluidas para indexacion.</p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th class="priority">Prioridad</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="s:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="s:loc"/>
                    </a>
                  </td>
                  <td class="priority">
                    <xsl:value-of select="s:priority"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
