import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

const Datagrid = () => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("datagrid_data");
    return storedData ? JSON.parse(storedData) : [
      { id: 1, name: "Sudheer", dob: "13-05-1989", occupation: "Engineer" },
      { id: 2, name: "Ajay", dob: "12-04-1994", occupation: "Manager" },
      { id: 3, name: "Puja", dob: "12-12-1996", occupation: "Architect" }
    ];
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [newData, setNewData] = useState({ id: null, name: "", dob: "", occupation: "" });

  useEffect(() => {
    localStorage.setItem("datagrid_data", JSON.stringify(data));
  }, [data]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewData(data[index]); // Set the newData state to the data for the row being edited
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], ...newData };
    setData(updatedData);
    setEditIndex(-1);
    window.location.reload(false);
  };

  const handleAdd = () => {
    setNewData({ id: data.length + 1, name: "", dob: "", occupation: "" });
    setData([...data, newData]);
  };

  return (
    <div style={{backgroundColor:'rgb(133, 161, 158)', borderRadius:'1rem', margin:'1rem auto', width:'51%', minWidth:'50rem', boxShadow:'0 0 0.5rem 0.2rem rgba(0.4, 0.4, 0.4, 0.4)'}}>
      <h2>Table:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Occupation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={newData.name}
                onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                style={{fontSize:'1.1rem'}}
              />
            </td>
            <td>
              <input
                type="date"
                value={newData.dob}
                onChange={(e) => setNewData({ ...newData, dob: e.target.value })}
                style={{fontSize:'1.1rem'}}
              />
            </td>
            <td>
              <input
                type="tex"
                value={newData.occupation}
                onChange={(e) => setNewData({ ...newData, occupation: e.target.value })}
                style={{fontSize:'1.1rem'}}
              />
            </td>
            <td>
              <ColorButton onClick={handleAdd} variant="contained" style={{flex: 1, backgroundColor:'blue' }}>Save</ColorButton>
            </td>
          </tr>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{editIndex === index ? <input type="text" value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} /> : row.name}</td>
              <td>{editIndex === index ? <input type="text" value={newData.dob} onChange={(e) => setNewData({ ...newData, dob: e.target.value })} /> : row.dob}</td>
              <td>{editIndex === index ? <input type="text" value={newData.occupation} onChange={(e) => setNewData({ ...newData, occupation: e.target.value })} /> : row.occupation}</td>
              <td>
    {editIndex === index ? (
       <>
        
       <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>
           <ColorButton onClick={() => handleSave(index)} variant="contained" style={{flex: 1, backgroundColor:'blue' }}>Save</ColorButton>
           <ColorButton onClick={() => {setEditIndex(-1); window.location.reload(false);}} variant="contained" style={{flex: 1, backgroundColor:'red' }}>Cancel</ColorButton>
       </Stack>
   </>
   ) : (
   <>
     <Stack spacing={2} direction="row" style={{display:'flex', margin:'1rem'}}>
           <ColorButton onClick={() => handleEdit(index)} variant="contained" style={{flex: 1, backgroundColor:'blue' }}>Edit</ColorButton>
           <ColorButton onClick={() => handleDelete(index)} variant="contained" style={{flex: 1, backgroundColor:'red' }}>Delete</ColorButton>
    </Stack>
   </>
        )}
        </td>
    </tr>
))}
        </tbody>
    </table>
</div>
);};

export default Datagrid;
