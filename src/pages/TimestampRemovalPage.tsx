import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Stack,
  Textarea,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { action, atom } from "@reatom/framework";
import { reatomComponent } from "@reatom/npm-react";

const $text = atom("");
const $removedText = atom("");
const $removedTextLength = atom<number>(0);

const removeTimestamps = action((ctx) => {
  const text = ctx.get($text);
  const timestampRegex = /\b\d{1,2}:\d{2}(?::\d{2})?\b/g;
  const removedText = text
    .replace(timestampRegex, "")
    .replace(/\s+/g, " ")
    .trim();
  $removedText(ctx, removedText);

  $removedTextLength(ctx, text.length - removedText.length);
});

export const TimestampRemovalPage = reatomComponent(
  ({ ctx }) => (
    <Container>
      <Stack justify="space-between" mb="1rem">
        <Textarea
          value={ctx.spy($text)}
          onChange={(event) => {
            $text(ctx, event.currentTarget.value);
          }}
          label="Text"
          description={"Enter the text you want to remove timestamps"}
          autosize
          minRows={15}
          maxRows={15}
        />
        <Button onClick={() => removeTimestamps(ctx)}>Remove timestamp</Button>
      </Stack>
      <Divider my="md" />
      <Flex gap={10}>
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
          gradient={{ from: "cyan", to: "green", deg: 90 }}
        >
          Text without timestamp: {ctx.get($removedText).length}
        </Badge>
        <Badge
          size="xl"
          variant="gradient"
          gradient={{ from: "red", to: "red", deg: 90 }}
        >
          Removed characters: {ctx.spy($removedTextLength)}
        </Badge>
      </Flex>
      <Divider my="md" />
      <Textarea
        value={ctx.spy($removedText)}
        label="Result"
        description={"Text without timestamps"}
        autosize
        minRows={15}
        maxRows={15}
      />
    </Container>
  ),
  "TimestampRemovalPage",
);
