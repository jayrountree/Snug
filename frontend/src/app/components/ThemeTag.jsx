import { Tag } from "@chakra-ui/tag";
import { styles } from "../assets/data";
const ThemeTag = ({ tag }) => {
  return (
    <Tag
      p="2"
      m="1"
      size="sm"
      colorScheme={styles.find((obj) => obj.label === tag)?.colorScheme}
    >
      {tag}
    </Tag>
  );
};

export default ThemeTag;
