import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputLeftAddon
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";


const Searchbar = ({ search, setSearch, setSearchWords }) => {
  return (
    <div>
      <InputGroup size="sm">
        <InputLeftElement 
        pointerEvents="none" children={<Search2Icon color="gray.600" />}>
        </InputLeftElement>
        <Input
          borderRadius={10}
          type="text"
          placeholder="Search" border="1px solid #949494"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              setSearchWords(search.split(' '));
            }}>
        </Input>
        {/* <InputRightAddon
          p={0}
          border="none"
        >
          <Button size="sm" borderLeftRadius={0} borderRightRadius={10} border="1px solid #949494" 
          onClick={() => {setSearchWords(search.split(' '))}}>
            Search
          </Button>
        </InputRightAddon> */}
      </InputGroup>
    </div>
  );
};

export default Searchbar;
