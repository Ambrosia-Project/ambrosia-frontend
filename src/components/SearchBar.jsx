import { InputBase, InputAdornment, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleHelpIconClick = () => {
    setShowHelp(true);
  };

  const handleHelpIconClose = () => {
    setShowHelp(false);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InputBase
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          width: { xs: "70%", sm: "50%", md: "40%" },
          borderRadius: "9999px",
          padding: "0.25rem",
          paddingLeft: "1rem",
          marginRight: 1,
          border: "1px solid gray",
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              color="primary"
              onClick={handleSearch}
              edge="end"
              size="small"
            >
              <SearchIcon sx={{ color: "#FF914D" }} />
            </IconButton>
          </InputAdornment>
        }
      />
      <Tooltip
        open={showHelp}
        onClose={handleHelpIconClose}
        title="Press Enter to search"
        placement="top-end"
        enterTouchDelay={0}
        disableFocusListener
        disableHoverListener={!showHelp}
        disableTouchListener={!showHelp}
      >
        <IconButton
          color="primary"
          onClick={handleSearch}
          onMouseEnter={handleHelpIconClick}
          onMouseLeave={handleHelpIconClose}
          edge="end"
          size="small"
        >
          <HelpIcon style={{ color: "#5E9459" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SearchBar;
