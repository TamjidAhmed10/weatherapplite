import { useState } from "react";
const SearchSuggestion = ({ suggestions, url, api, changeWeather }) => {
  const [text, setText] = useState("");

  const [selected, setSelected] = useState([]);

  const textChangeHandler = (text) => {
    let match = [];

    if (text.length > 0) {
      match = suggestions.filter((suggestion) => {
        const regex = new RegExp(`^${text}`, "gi");
        return suggestion.match(regex);
      });
    }
    setSelected(match);
    setText(text);
  };
  const searchV2 = async (text1) => {
    let newText = text1;
    if (text1.indexOf(" ") > 0) {
      newText = newText.replace(/\s/g, "%20");
    }
    fetch(`${url}${api}&q=${newText}`)
      .then((response) => response.json())
      .then((data) => {
        changeWeather(data);
      });
  };
  const onClickHandler = (select) => {
    setText(select);
    searchV2(select);
    setSelected([]);
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      let newText = text;
      if (text.indexOf(" ") > 0) {
        //replace whitespace from string with %20
        newText = newText.replace(/\s/g, "%20");
      }

      fetch(`${url}${api}&q=${newText}`)
        .then((response) => response.json())
        .then((data) => {
          changeWeather(data);
        });
    }
  };

  return (
    <div>
      <div className="">
        <div className="inline-flex flex-col justify-center relative text-gray-500 ">
          <div className="relative">
            <div className="w-full md:w-500">
              <input
                type="text"
                value={text}
                onChange={(e) => textChangeHandler(e.target.value)}
                className=" w-full p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="search..."
                onBlur={(e) => {
                  setTimeout(() => {
                    setSelected([]);
                  }, 300);
                }}
                onKeyPress={search}
              />
            </div>

            <svg
              className="w-4 h-4 absolute left-2.5 top-3.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <ul className="bg-white border border-gray-100 w-full mt-2">
            {selected &&
              selected.slice(0, 5).map((select, i) => {
                return (
                  <li
                    className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900 "
                    key={i}
                    onClick={() => onClickHandler(select)}
                  >
                    <svg
                      className="absolute w-4 h-4 left-2 top-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {select}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestion;
