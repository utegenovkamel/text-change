import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  NumberInput,
  Stack,
  Textarea,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { action, atom } from "@reatom/framework";
import { reatomComponent } from "@reatom/npm-react";
import { ListSeparatedText } from "../components/ListSeparatedText.tsx";

interface SeparatedText {
  id: string;
  text: string;
}

const $text = atom("");
const $characterCount = atom<string | number | undefined>(undefined);
const $countWords = atom<number>((ctx) => {
  const text = ctx.spy($text);
  return text.split(" ").length;
});
export const $listSeparatedText = atom<SeparatedText[]>([]);

const splitText = action((ctx) => {
  const currentText = ctx.get($text);
  const count = ctx.get($characterCount);

  if (typeof count === "number" && count > 0) {
    const chunks: SeparatedText[] = [];
    for (let i = 0; i < currentText.length; i += count) {
      chunks.push({
        id: crypto.randomUUID(),
        text: currentText.substring(i, i + count),
      });
    }
    $listSeparatedText(ctx, chunks);
  }
}, "splitText");

export const TextSplitterPage = reatomComponent(({ ctx }) => {
  console.log("go");
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
        <NumberInput
          value={ctx.spy($characterCount)}
          onChange={(value) => $characterCount(ctx, value)}
          label="Number of characters"
          thousandSeparator=" "
        />
        <Button onClick={() => splitText(ctx)}>Separate</Button>
      </Stack>
      <Divider my="md" />
      <Flex>
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
          Count words: {ctx.get($countWords)}
        </Badge>
      </Flex>
      <Divider my="md" />
      <Stack>
        <ListSeparatedText />
      </Stack>
    </Container>
  );
}, "TextSplitterPage");
