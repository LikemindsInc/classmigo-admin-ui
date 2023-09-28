import { Pagination } from "@mui/material";

interface Props {
  totalPages: number;
  page: number;
  filter: any;
  fetchFunction: () => void;
  onPageChange: () => void;
}

export const PaginationElement = ({
  totalPages,
  page,
  onPageChange,
}: Props) => {
    const handleChange = (e:any, p:number) => {
        
    }
  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      page={page}
      count={totalPages}
      onChange={handleChange}
    />
  );
};
