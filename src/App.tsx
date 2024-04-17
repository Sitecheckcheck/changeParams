import React, { useState } from "react";
import "./app.css";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

// interface Props {
//   params: Param[];
//   model: Model;
// }

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const App: React.FC = () => {
  const [editedValues, setEditedValues] = useState<Map<number, string>>(() => {
    const initialEditedValues = new Map<number, string>();
    model.paramValues.forEach(({ paramId, value }) => {
      initialEditedValues.set(paramId, value);
    });
    return initialEditedValues;
  });

  const handleParamChange = (paramId: number, value: string) => {
    setEditedValues((prevValues) => new Map(prevValues).set(paramId, value));
  };

  const getModel = (): Model => {
    const paramValues: ParamValue[] = [];
    editedValues.forEach((value, paramId) => {
      paramValues.push({ paramId, value });
    });
    return { paramValues };
  };

  return (
    <div className='app'>
      <div className="main">
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={editedValues.get(param.id) || ""}
              onChange={(e) => handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => console.log(getModel())}>Save</button>
      </div>
    </div>
  );
};

export default App;
