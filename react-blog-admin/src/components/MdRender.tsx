import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
interface Iprops {
  content: string;
}

export default function MarkDown({ content }: Iprops) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      className="w-full"
      children={content}
      // children={content?.replace(/\\n/g, '\n')}
    />
  );
}
