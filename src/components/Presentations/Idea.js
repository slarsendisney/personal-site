import React from "react";

const thinking =
  "https://firebasestorage.googleapis.com/v0/b/personalwebsite-fe5d4.appspot.com/o/Thought.png?alt=media&token=593cba54-930a-4345-868a-8f9a6d90cfa9";

export default ({ content }) => {
  return (
    <div className="flex row">
      <div className="col-xs-12 col-md-3">
        <img src={thinking} style={{ height: "40vw", maxHeight: 400 }}></img>
      </div>
      <div className="col-xs-12 col-md-9">
        <div
          className="bg-accent text-secondary p-5 rounded ml-5"
          style={{ display: "inline-table", maxWidth: 750 }}
        >
          <h6
            className="margin-0 font-weight-normal text-3xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};
