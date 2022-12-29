declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare interface ResponseInfo {
  status: number;
  msg: string;
}

declare interface User {
  email: string;
  password: string;
}

declare interface InitialStateType {
  name: string;
  avatar: string;
  role: string
}

declare interface RequestProps {
  loading?: boolean;
  data?: any;
}

declare namespace Article {

  interface ArticleParams {
    pageNo: number;
    pageSize: number;
    category_id?: number;
    tags_id?: number[];
  }
  interface InsertProps {
    title: string;
    content: string;
    time: string;
    category_id: number;
    tags_id: Array<number>;
  }
  interface UpdateProps extends InsertProps {
    id: number
  }
  interface ArticleProps {
    id: number;
    title: string;
    category: string;
    tags: string[];
    time: string;
    content: string;
  }
  type Temp = Omit<ArticleProps, 'tags'>;
  // ts好像不太支持类型和接口重写
  // https://stackoverflow.com/questions/49198713/override-the-properties-of-an-interface-in-typescript
  interface ColumnProps extends Temp {
    tags: {
      name: string;
      color: string;
    }[];
  }

}

declare namespace Category {
  interface CateProps {
    id: number;
    name: string;
    count: number;
  }

}

declare namespace Tag {
  interface TagProps {
    id: number;
    name: string;
    count: number;
    color: string;
  }
}

declare namespace Comment {
  interface CommentProps {
    nickname: string;
    email: string;
    link?: string;
    avatar: string;
    post_id: number;
    time: string;
    content: string;
  }
  interface ReplyProps {
    comment_id: string,
    nickname: string;
    email: string;
    link?: string;
    avatar: string;
    time: string;
    content: string
    to_reply_id: string;
    to_user_name: string
  }
  interface CommentTable {
    id: string;
    title?: string;
    nickname: string;
    email: string;
    avatar: string;
    content: string;
    time: string;
    replys: ({
      to_user_name: string;
    } & CommentTable)[]
  }
}

declare namespace SayOrTimeLine {
  interface Params {
    id: number;
    // 这里加两个问号的原因是因为Say那里必须保持record、
    // <EditableProTable<Say.SayParams>和onSave统一
    // 如果不加<EditableProTable<Say.SayParams>则save那里就说找不到content和time
    // 如果加了就要求record那里补充content和time
    content?: string;
    time?: string;
  }
  interface InsertProps {
    content: string;
    time: string;
  }
}