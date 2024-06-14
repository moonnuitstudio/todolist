
import { createTableTask } from "../models/Todo"

const rows = [
    createTableTask(1, 'Cupcake', '02/21/2024', false, 'default', false),
    createTableTask(2, 'Donut', '02/21/2024', false, 'default', false),
    createTableTask(3, 'Eclair', '02/21/2024', false, 'default', false),
    createTableTask(4, 'Frozen yoghurt', '02/21/2024', false, 'default', false),
    createTableTask(5, 'Gingerbread', '02/21/2024', false, 'default', false),
];
  
const initialStates = {
    tasks: rows
}