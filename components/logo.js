/** @jsxImportSource theme-ui */
import { jsx, Image } from 'theme-ui';
import Link from 'next/link';


export default function Logo({ src, ...rest }) {
  return (
    <Image src={src} alt="page logo" />
  );
}
