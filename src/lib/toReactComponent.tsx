import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
// styles the ul from contentful
export const formatOptions = {
  renderNode: {
    [BLOCKS.UL_LIST]: (node: any, children: any[]) => {
      return (
        <ul>
          {children.map((item: any) => (
            <li key={item.key}>{item.props.children[0].props.children[0]}</li>
          ))}
        </ul>
      );
    },
  },
};
