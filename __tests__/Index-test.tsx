import { render } from '@testing-library/react-native';
import AddTodo from '@/app/components/AddTodo';


  it('renders without crashing', () => {
    render(<AddTodo />);
  });