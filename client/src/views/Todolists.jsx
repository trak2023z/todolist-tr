import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RotatingSquare } from "react-loader-spinner";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { useTodolists } from "../hooks/useTodolist";
import { useAuth } from "../hooks/useAuth";
import { todolistsApiSlice } from "../reducers/todolistsApiSlice";
import Button from "../components/Button";
import Modal from "../components/Modal";

const Todolists = () => {
  const hook = useTodolists();
  const authHook = useAuth();
  const endpoint = todolistsApiSlice;
  const getEndpoint = todolistsApiSlice.endpoints.getTodolistsNotDone;
  const header = "Todolist";
  const [modalIsOpenFormAdd, setModalIsOpenFormAdd] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getEndpointName =
      isDone === true ? `get${header}sDone` : `get${header}sNotDone`;
    dispatch(
      endpoint.util.prefetch(getEndpointName, undefined, {
        force: true,
      })
    );
  }, [isDone]);

  const getEndpointQuery =
    isDone === false ? getEndpoint : endpoint.endpoints.getTodolistsDone;

  const { data, isFetching: fetching } =
    getEndpointQuery.useQueryState(undefined);

  console.log(data);
  return (
    <div>
      <div
        className={`grid md:grid-cols-3 items-center md:h-[10vh] bg-lightGrey w-full border-b-2 border-grey grid-cols-2 grid-rows-1 h-[20vh]`}
      >
        <h1 className="font-extrabold ml-[2vw]">{header}s</h1>
        <div className="flex justify-center items-center ml-[-25px] gap-[50px] md:grid-col-span-2 md:ml-20 md:mr-20">
          <div
            className={`cursor-pointer font-bold relative text-[green] ${
              isDone &&
              "before:block before:absolute before:ml-[-10%] before:w-[120%] before:h-[5px] before:bottom-[-5px] before:bg-[green]"
            }`}
            onClick={() => setIsDone(true)}
          >
            DONE
          </div>
          <div
            className={`cursor-pointer font-bold relative text-[red] ${
              !isDone &&
              "before:block before:absolute before:ml-[-10%] before:w-[120%] before:h-[5px] before:bottom-[-5px] before:bg-[red]"
            }`}
            onClick={() => setIsDone(false)}
          >
            NOT DONE
          </div>
        </div>
        <div className={`flex justify-center items-center w-full gap-[50px]`}>
          <div className={`flex justify-center items-center w-1/2`}>
            <Button
              name={`Add ${header}`}
              onClick={() => setModalIsOpenFormAdd(true)}
            />
          </div>
          <Button
            onClick={() => authHook.handleLogOut()}
            color="red"
            height="40px"
            name="Log out"
          />
        </div>
      </div>
      <div className="w-full h-[92.5vh] overflow-auto text-gray-800 bg-lightGrey">
        {fetching ? (
          <div className="w-full h-[92.5vh] flex items-center justify-center">
            <RotatingSquare
              height="100"
              width="100"
              color="#616161"
              ariaLabel="rotating-square-loading"
              strokeWidth="4"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 300,
                fontFamily: ["Montserrat", "sans-serisf"].join(","),
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead className="bg-lightGrey">
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "15px",
                      paddingLeft: "30px ",
                    }}
                    align="start"
                  >
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.results.map((row, index) => {
                  const { description } = row;
                  return (
                    <TableRow
                      className={`${
                        index % 2 === 0 ? "bg-grey" : "bg-lightGrey"
                      }`}
                      key={row.id}
                      sx={{ "& td": { border: 0 } }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: "200",
                          fontSize: "15px",
                          paddingLeft: "30px ",
                        }}
                        align="start"
                      >
                        <div className="w-full flex flex-row">
                          <div className="w-[80%] flex items-center">
                            {description}
                          </div>
                          <div className="w-[20%]">
                            <Button
                              name={
                                isDone ? "Change to Not Done" : "Change to Done"
                              }
                              color={isDone ? "red" : "blue"}
                              width="250px"
                              height="30px"
                              onClick={async (e) => {
                                e.stopPropagation();
                                await hook.handleDoned(row, {
                                  isDoned: isDone ? false : true,
                                });
                                setIsDone((prev) => !prev);
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Modal
        header={header}
        modalIsOpen={modalIsOpenFormAdd}
        closeModal={() => setModalIsOpenFormAdd(false)}
        hook={hook}
      />
    </div>
  );
};

export default Todolists;
