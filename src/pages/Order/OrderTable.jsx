import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import { Delete, Remove, Add } from "@mui/icons-material";

function OrderTable({
  role,
  classes,
  orderItems,
  data,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleDeleteItem,
}) {
  const decodeBase64Image = (base64Image) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64Image}`;
    return img.src;
  };

  return (
    <Grid item xs={12} className={classes.tableContainer}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.columnHeader}>Meal Image</TableCell>
              <TableCell className={classes.columnHeader}>Meal Name</TableCell>
              <TableCell className={classes.columnHeader}>Quantity</TableCell>
              <TableCell
                className={`${classes.columnHeader} ${classes.priceColumn}`}
              >
                Price
              </TableCell>
              {role !== "waiter" && (
                <TableCell className={classes.columnHeader}>Delete</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.length > 0 &&
              orderItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ padding: { xs: 0, md: 2 } }}>
                    {item.menu.imageFile !== "empty" ? (
                      <img
                        src={decodeBase64Image(item.menu.imageFile)}
                        alt={item.menu.meal_name}
                        className={classes.mealImage}
                      />
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={80}
                        bgcolor="#f5f5f5"
                        color="#999999"
                        borderRadius="1rem"
                        width={80}
                        marginRight={0.5}
                      >
                        <Typography>No Photo</Typography>
                      </Box>
                    )}
                  </TableCell>

                  <TableCell>
                    <Typography className={classes.mealName}>
                      {item.menu.meal_name}
                    </Typography>
                    <Typography className={classes.extraType}>
                      {item.menu.extra_type}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <div className={classes.quantityContainer}>
                      {role !== "waiter" && (
                        <IconButton
                          size="small"
                          className={classes.quantityButton}
                          disabled={data.hasOrdered}
                          onClick={() => handleDecreaseQuantity(item.menu.id)}
                        >
                          <Remove
                            style={{
                              color: data.hasOrdered
                                ? "rgba(0, 0, 0, 0.2)"
                                : "red",
                            }}
                          />
                        </IconButton>
                      )}
                      <Typography className={classes.quantityText}>
                        {item.quantity}
                      </Typography>
                      {role !== "waiter" && (
                        <IconButton
                          size="small"
                          className={classes.quantityButton}
                          disabled={data.hasOrdered}
                          onClick={() => handleIncreaseQuantity(item.menu.id)}
                        >
                          <Add
                            style={{
                              color: data.hasOrdered
                                ? "rgba(0, 0, 0, 0.2)"
                                : "green",
                            }}
                          />
                        </IconButton>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.menu.price * item.quantity}€</TableCell>
                  {role !== "waiter" && (
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteItem(item.menu.id)}
                        disabled={data.hasOrdered}
                      >
                        <Delete
                          style={{
                            color: data.hasOrdered
                              ? "rgba(0, 0, 0, 0.2)"
                              : "red",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TableFooter>
            <TableRow>
              <TableCell align="center" className={classes.totalPriceLabel}>
                Total Price:
              </TableCell>
              <TableCell align="center" className={classes.totalPriceValue}>
                {orderItems.reduce(
                  (total, item) => total + item.menu.price * item.quantity,
                  0
                )}
                €
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </div>
      </TableContainer>
    </Grid>
  );
}

export default OrderTable;
