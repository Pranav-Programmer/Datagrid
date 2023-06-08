# React Data Grid Component

The React Data Grid component provides a customizable data grid with editing, adding, and deleting functionality. It allows users to display and manipulate tabular data in a web application.
## Component Features

- Display data in a table format with customizable columns.
- Edit existing data by clicking on the "Edit" button.
- Add new rows to the grid with the ability to enter data.
- Delete rows from the grid with the click of a button.
- Save changes made to the data in real-time.
- Responsive design for optimal viewing on different devices.


## Installation
To use the React Data Grid component in your React.js web application, follow these steps:

1. Install the required dependencies by running the following command:

```bash
  npm install @mui/material react react-dom react-datepicker
```

2. Copy the 'Datagrid.js' file into your project's components directory.

3. Import and use the 'Datagrid' component in your application. For example:

```bash
  import Datagrid from './components/Datagrid';

function App() {
  return (
    <div>
      <h1>My React App</h1>
      <Datagrid />
    </div>
  );
}
```

4. Customize the component according to your needs by modifying the styling, column names, or data source.
## Usage

The React Data Grid component provides the following functionalities:

* Displaying existing data: The component takes an array of objects as input, where each object represents a row in the grid. The properties of each object correspond to the column names.

* Editing data: Clicking the "Edit" button allows you to modify the data in a row. The changes are saved when the "Save" button is clicked.

* Adding data: Use the input fields at the bottom of the grid to add new rows. Click the "Save" button to append the new data to the grid.

* Deleting data: Click the "Delete" button to remove a row from the grid.

Make sure to handle the storage of data in your application. The component utilizes local storage to persist the changes made to the data.

![image](https://user-images.githubusercontent.com/79044490/230316370-d38c3dd4-180c-4d47-a9da-2df77624ffc7.png)
![image](https://user-images.githubusercontent.com/79044490/230316457-8ee2a406-3745-4b0f-9475-c820de32b49d.png)

## Customization

Contributions to the React Data Grid component are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.


## 🚀 Credits

The React Data Grid component was created by Pranav Dharme.

Happy coding!
