import { reatomComponent } from "@reatom/npm-react";
import { memo } from "react";
import { $listSeparatedText } from "../pages/TextSplitterPage.tsx";
import { ItemSeparatedText } from "./ItemSeparatedText.tsx";

export const ListSeparatedText = memo(
  reatomComponent(({ ctx }) => {
    return (
      <>
        {ctx.spy($listSeparatedText).map((chunk, index) => {
          return (
            <ItemSeparatedText
              key={chunk.id}
              title={index + 1}
              content={chunk.text}
            />
          );
        })}
      </>
    );
  }),
);
