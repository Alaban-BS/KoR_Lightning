import { metadata } from './metadata';
import Template from './template';

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Template>
          {children}
        </Template>
      </body>
    </html>
  );
} 