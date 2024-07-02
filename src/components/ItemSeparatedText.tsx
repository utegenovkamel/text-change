import { Box, Button, Collapse, Flex, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { reatomComponent } from "@reatom/npm-react";
import { useState } from "react";
import { CopyButton } from "./CopyButton.tsx";

interface ItemTextProps {
  title: number;
  content: string;
}

export const ItemSeparatedText = reatomComponent<ItemTextProps>(
  ({ title, content }) => {
    const [opened, { toggle }] = useDisclosure(false);
    const [textCopied, setTextCopied] = useState(false);

    return (
      <Box>
        <Flex align="center" mb="0.5rem">
          <Button
            fullWidth
            onClick={toggle}
            color={textCopied ? "green" : undefined}
          >
            {title} {opened ? "close" : "open"}
          </Button>
          <CopyButton setTextCopied={setTextCopied} value={content} />
        </Flex>

        <Collapse in={opened}>
          <Textarea defaultValue={content} minRows={5} maxRows={15} />
        </Collapse>
      </Box>
    );
  },
);
