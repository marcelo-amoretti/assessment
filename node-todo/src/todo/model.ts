export type Todo = {
  id: string;
  text: string;
  priority?: number;
  done?: Boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};
