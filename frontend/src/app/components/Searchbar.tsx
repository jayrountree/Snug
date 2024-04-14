import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputLeftAddon,

  Container, FormControl, FormLabel 
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import { groupedOptions } from "../assets/data";


const Searchbar = ({ setSearchWords }) => {

  const handleSearch = (opt) => {
    let searchWords: String[] = [];
    opt.forEach((tag: Object) => {
      searchWords.push(tag.label);
    });
    setSearchWords(searchWords);
  }

  return (
    <div>
      <Container mb={20}>
        <FormControl p={4}>
          <Select
            isMulti
            onChange={opt => handleSearch(opt)}
            options={groupedOptions}
            placeholder="Search"
            closeMenuOnSelect={false}
          />
        </FormControl>
      </Container>
    </div>
  );
};

export default Searchbar;
