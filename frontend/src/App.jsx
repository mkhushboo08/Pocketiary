import API from "./services/api"
import {useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    API.get("/notes").then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    API.post("/notes", {
      title, content: detail, category
    }).then(res => {
      setNotes(prev => [...prev, res.data]);
      setTitle("");
      setDetail("");
    }).catch(err => console.log(err));
  };

  const deleteNote = (id) =>{
    API.delete(`/notes/${id}`).then(() => {
      setNotes(prev => prev.filter(note => note.id !== id));
    })
      .catch(err => console.log(err));
  };

  return (
    <div className="h-screen lg:flex bg-black text-white">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex lg:w-1/2 gap-4 items-start flex-col p-10"
      >
        <h1 className="text-4xl font-bold">Add Notes</h1>
        {/* input for heading */}
        <input
          type="text"
          placeholder="Notes Heading"
          className="px-5 py-2 w-full border-2 outline-none rounded font-medium"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {/* detail input */}
        <textarea
          type="text"
          placeholder="Write here"
          className="px-5 py-2 w-full h-30 border-2 outline-none rounded font-medium"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Category"
          className="px-5 py-2 w-full border-2 outline-none rounded font-medium"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="bg-white active:bg-green-500 active:scale-90 w-full text-black px-5 py-2 rounded font-medium">
          Add Note
        </button>
      </form>
      <div className="lg:w-1/2 lg:border-l-2 p-10 ">
        <h1 className="text-3xl font-bold">Recent Notes</h1>
        <div className="flex flex-wrap justify-start items-start gap-5 mt-5 h-full overflow-auto">
          {notes.map(function (elem) {
            return (
              <div
                key={elem.id}
                className="flex justify-between flex-col  item-start relative h-50 w-50 p-9 pb-5 text-black rounded-2xl bg-cover bg-[url('https://static.vecteezy.com/system/resources/thumbnails/010/793/873/small/a-lined-note-paper-covered-with-transparent-tape-on-a-yellow-background-with-a-white-checkered-pattern-free-png.png')]"
              >
                <div>
                  <h3 className="leading-tight text-xl font-bold">
                    {elem.title}
                  </h3>
                  <p className="mt-3 text-xs font-semibold leading-tight text-gray-500 ">
                    {elem.content}
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteNote(elem.id);
                  }}
                  className="w-full cursor-pointer active:scale-95 py-1 text-xs rounded font-bold bg-red-500 text-white "
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
