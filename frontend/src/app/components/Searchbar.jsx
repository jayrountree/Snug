import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputLeftAddon,
  Container,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import { groupedOptions } from "../assets/data";
import { PiXCircleThin } from "react-icons/pi";

const Searchbar = ({ setSearchWords }) => {
  // console.log("tewstrs");

  const handleSearch = (opt) => {
    // console.log(opt);

    let searchWords = [];
    opt.forEach((tag) => {
      searchWords.push(tag.label);
    });
    setSearchWords(searchWords);
  };

  return (
    <div style={{ width: "450px" }}>
      <Container>
        <FormControl p={4}>
          <Select
            isMulti
            onChange={(opt) => handleSearch(opt)}
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
