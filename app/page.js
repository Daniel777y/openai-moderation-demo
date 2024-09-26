"use client";

import { useState, useEffect } from "react";
import Response from "@/components/Response";

const Home = () => {

  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [type, setType] = useState("text");

  const options = [
    {
      name: "Text",
      value: "text",
    },
    {
      name: "Image",
      value: "image",
    },
  ];

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setApiKey(localStorage.getItem("apiKey"));
  }, []);

  const getResponse = async () => {
    if (!apiKey) {
      alert("Please enter an API key");
      return;
    }
    const input = type === "text" ? text : [
      {
        type: "image_url",
        image_url: {
          url: text,
        },
      },
    ];
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        "model": "omni-moderation-latest",
        "input": input,
      }),
    });

    if (!response.ok) {
      setResponse({
        error: "Error",
      });
      return;
    }
    const data = await response.json();
    setResponse(data);
  };

  const handleClick = async () => {
    await getResponse();
  };

  const handleSummitKeyDown = async (e) => {
    if (e.key === "Enter") {
      await getResponse();
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem("apiKey", apiKey);
    alert("API key saved");
  };

  const handleChangeApiKey = (e) => {
    setApiKey(e.target.value);
  };

  const handleSaveKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveApiKey();
    }
  };

  return (
    <div className="py-4 w-full flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-full flex flex-row gap-4 items-center justify-center border-2 border-black rounded-md p-4">
        <input
          type="text"
          value={apiKey}
          onKeyDown={handleSaveKeyDown}
          onChange={handleChangeApiKey}
          className="w-full outline-none border-none"
          placeholder="Enter your API key"
        />
        <button
          onClick={handleSaveApiKey}
        >
          Save
        </button>
      </div>
      <div className="w-full h-full border-2 border-black rounded-md p-4">
        <Response response={response} />
      </div>
      <div className="w-full flex flex-row gap-4 items-center justify-center border-2 border-black rounded-md p-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="outline-none border-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={text}
          onKeyDown={handleSummitKeyDown}
          onChange={handleChange}
          className="w-full outline-none border-none"
          placeholder={type === "text" ? "Enter your text" : "Enter your image URL"}
        />
        <button
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;