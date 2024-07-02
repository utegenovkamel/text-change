import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Stack,
  TagsInput,
  Textarea,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { action, atom } from "@reatom/framework";
import { reatomComponent } from "@reatom/npm-react";

interface SeparatedText {
  id: string;
  text: string;
}
// как сказал зара он сука тупой бля валенок бля
const $text = atom("");
const $resultText = atom("");
const $countDeletingWords = atom(0);
const $countWords = atom<number>((ctx) => {
  const text = ctx.spy($text);
  return text.split(" ").length;
});
export const $listSeparatedText = atom<SeparatedText[]>([]);
const $deletignWords = atom<string[]>([]);

const splitText = action((ctx) => {
  const text = ctx.get($text);
  const deletignWords = ctx.get($deletignWords);
  const wordsArray = text.split(" ");
  $resultText(
    ctx,
    wordsArray
      .map((word) => {
        if (deletignWords.includes(word)) {
          $countDeletingWords(ctx, ctx.get($countDeletingWords) + 1);
        } else {
          return word;
        }
      })
      .join(" "),
  );
}, "splitText");

export const DeletingWordsPage = reatomComponent(({ ctx }) => {
  console.log(ctx.spy($resultText));
  return (
    <Container>
      <Stack justify="space-between" mb="1rem">
        <Textarea
          value={ctx.spy($text)}
          onChange={(event) => {
            $text(ctx, event.currentTarget.value);
          }}
          label="Text"
          description={"Enter the text you want to split"}
          autosize
          minRows={15}
          maxRows={15}
        />
        <TagsInput
          data={ctx.get($deletignWords)}
          onChange={(value) => {
            $deletignWords(ctx, value);
          }}
        />
        <Button onClick={() => splitText(ctx)}>Separate</Button>
      </Stack>
      <Divider my="md" />
      <Flex gap={10} wrap="wrap">
        <Badge
          size="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Text length: {ctx.get($text).length}
        </Badge>
        <Badge
          size="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Result length: {ctx.get($resultText).length}
        </Badge>
        <Badge
          size="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Count deleting words: {ctx.get($countDeletingWords)}
        </Badge>
        <Badge
          size="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Count words: {ctx.get($countWords)}
        </Badge>
      </Flex>
      <Divider my="md" />
      <Stack>
        <Textarea value={ctx.spy($resultText)} />
      </Stack>
    </Container>
  );
}, "TextSplitterPage");
