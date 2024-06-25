import React, { useState } from "react";
import "./Searchbar.css";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const mockResults = [
    {
      title: "Google",
      link: `https://www.google.com/search?q=${query}`,
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_92x30dp.png",
    },
    {
      title: "Google Maps",
      link: "https://maps.google.com",
      img: "https://maps.google.com/favicon.ico",
    },
    {
      title: "Google Translate",
      link: `https://translate.google.com?text=${query}&tl=hi`,
      img: "https://translate.google.com/favicon.ico",
    },
  ];

  function getDataByIndex(index, increment) {
    const adjustedIndex = index + increment;
    if (adjustedIndex >= 0 && adjustedIndex < mockResults.length) {
      return mockResults[adjustedIndex];
    } else {
      return null;
    }
  }

  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.trim() && query.length > 0) {
      setSelectedIndex(-1);
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % results.length);
     
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + results.length) % results.length
      );
    
    } else if (e.key === "Enter" && selectedIndex >= 0) {
        console.log(results[selectedIndex]);
          window.location.href=results[selectedIndex]?.link
    //   setQuery(results[selectedIndex].title);
      setResults([]);
    }
  };
  

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
        <div className="search-icon">
        <i class="fa fa-search"></i>
            </div>
      {results.length > 0 && (
        <div className="dropdown">
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                className={index === selectedIndex ? "selected" : ""}
               
              >
                <a href={result.link}>
                  <img src={result.img} alt={result.title} />
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
