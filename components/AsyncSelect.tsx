import React, { ReactNode, useEffect, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { components } from "react-select";
import debounce from "lodash/debounce";
import { getTags } from "@/lib/commonApi";
import { useQuery } from "react-query";

type Props = {
  selectedTags: Array<String>;
  setSelectedTags: React.Dispatch<React.SetStateAction<String[]>>;
};

export const reselectStyles = {
  control: (styles: object) => ({
    ...styles,
    backgroundColor: "#fff",
    minHeight: "52px",
    borderRadius: "0px",
    border: "0",
    ":focus-within": {
      border: "0",
      outline: "none",
      boxShadow: "none",
      borderBottom: "2px solid grey !important",
    },
  }),
  menu: (styles: object) => ({
    ...styles,
    marginTop: "4px",
    boxShadow: "none",
    border: "1.5px solid #E4E7EC",
    zIndex: 100,
  }),
  menuList: (styles: object) => ({
    ...styles,
    backgroundColor: "#fff",
    fontSize: "14px",
    borderRadius: "4px",
  }),
  option: (styles: object) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      cursor: "pointer",
      padding: "10px",
      ":hover": {
        backgroundColor: "#f5f5f5",
      },
    };
  },
  input: (styles: object) => ({
    ...styles,
    color: "#344054",
    fontSize: "16px",
    border: "0",
  }),
  placeholder: (styles: object) => ({
    ...styles,
    fontSize: "16px",
    color: "#98A2B3",
  }),
  singleValue: (styles: object) => ({
    ...styles,
    color: "inherit",
    fontSize: "16px",
  }),
  multiValue: (styles: object) => ({
    ...styles,
    color: "inherit",
    fontSize: "20px",
    padding: "2px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
  }),
  multiValueRemove: (styles: object) => ({
    ...styles,
    color: "grey",
    fontSize: "20px",
    scale: "1.2",
    padding: "2px",
    height: "max-content",
    margin: "auto",
    ":hover": {
      color: "grey",
    },
  }),
};

const getData = async (input: string, callback: any) => {
  if (input.length) {
    const { data } = await getTags(input);
    callback(data.data.tags);
  }
};

function AsyncSelect({ selectedTags, setSelectedTags }: Props) {
  const { data } = useQuery("get-default-tags", async () => {
    const res = await getTags("");
    return res.data.data.tags.map((i: any) => {
      return { label: i.name, value: i.name, info: i.info };
    });
  });

  const handleOptionSelect = (data: any) => {
    setSelectedTags(
      data.map((i: any) =>
        i.value.includes("#")
          ? i
          : { label: `#${i.label}`, value: `#${i.value}` }
      )
    );
  };
  const debouncedGetCompany = debounce(getData, 1500);
  return (
    <div>
      <AsyncCreatableSelect
        styles={reselectStyles}
        cacheOptions
        isMulti
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Option: (props) => {
            return <CustomOption props={props} />;
          },
        }}
        value={selectedTags}
        placeholder="Add up to 4 Tags..."
        getOptionValue={(option: any) => option.label}
        loadOptions={debouncedGetCompany as any}
        formatCreateLabel={(input: string) => `#${input}`}
        defaultOptions={data}
        onChange={handleOptionSelect}
        allowCreateWhileLoading
      />
    </div>
  );
}
const CustomOption = ({ props }: { props: any }) => {
  return (
    <React.Fragment>
      <components.Option {...props}>
        <div className="flex flex-col gap-2 w-full p-2">
          <span className="text-grey-800 text-sm font-bold font-mono">
            {props?.children?.toLowerCase()}
          </span>
          {props.data.value && (
            <span className="text-xs">{props.data.info}</span>
          )}
        </div>
      </components.Option>
    </React.Fragment>
  );
};

export default AsyncSelect;
