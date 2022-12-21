import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { StorageService } from "../../services/storage";
import { Button } from "@mui/material";
import { style } from "@mui/system";
import styled from "@emotion/styled";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StyledBox = styled(Box)`
  display: "flex";
  flex-wrap: "wrap";
  gap: 0.5;
  width: 150px;
`;

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ChipBox = ({ setSelectedTags }) => {
  const theme = useTheme();
  const [personName, setPersonName] =React.useState([]);
  const allEntries = StorageService.fetchAllEntries();
  const allTag = StorageService.EntriesFilters(allEntries);

  const [tags, setTags] = React.useState([]);
  


  React.useEffect(() => {
    setTags([...allTag]);
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
 
  const handleClickChange = () => {
    setSelectedTags(personName)
  }


  return (
    <div>
      <StyledFormControl>
        <InputLabel id="demo-multiple-chip-label">#Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="check" style={{minWidth : "250px"}}/>}
          renderValue={(selected) => (
            <StyledBox>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </StyledBox>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleClickChange}>Search</Button>
      </StyledFormControl>
    </div>
  );
};

export default ChipBox;
