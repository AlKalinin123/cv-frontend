import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TableFooter,
  TablePagination,
  Paper,
  Avatar,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useState } from 'react'

type SortableValue = string | number | Date | boolean | null | undefined

interface BaseTableHeader {
  value: string
  label: string
}

interface BaseTableData {
  [key: string]: SortableValue
}

interface BaseTableProps {
  data: BaseTableData[]
  headers: BaseTableHeader[]
  orderBy?: keyof BaseTableData
  order?: 'asc' | 'desc'
}

type Order = 'asc' | 'desc'

const avatarColors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
]

function getSortValue(value: SortableValue): string | number | boolean {
  if (value === null || value === undefined) {
    return ''
  }
  if (typeof value === 'string') {
    const date = new Date(value)
    if (!isNaN(date.getTime())) {
      return date.getTime()
    }
    return value.toLowerCase()
  }
  if (value instanceof Date) {
    return value.getTime()
  }
  if (typeof value === 'boolean') {
    return value
  }
  return value
}

function descendingComparator<T extends Record<string, SortableValue>>(
  a: T,
  b: T,
  orderBy: keyof T,
) {
  const aValue = getSortValue(a[orderBy])
  const bValue = getSortValue(b[orderBy])

  if (bValue < aValue) {
    return -1
  }
  if (bValue > aValue) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof BaseTableData>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: BaseTableData[Key] },
  b: { [key in Key]: BaseTableData[Key] },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function createData(
  headers: BaseTableHeader[],
  item: BaseTableData,
): BaseTableData {
  return headers.reduce<BaseTableData>((acc, header) => {
    acc[header.value] = item[header.value]
    return acc
  }, {})
}

function renderCellValue(value: SortableValue): React.ReactNode {
  if (value == null) {
    return '-'
  }

  if (value instanceof Date) {
    return value.toLocaleDateString()
  }

  return String(value)
}

export const BaseTable = ({
  data,
  headers,
  orderBy: initialOrderBy,
  order: initialOrder,
}: BaseTableProps) => {
  const [order, setOrder] = useState<Order>(initialOrder || 'asc')
  const [orderBy, setOrderBy] = useState<keyof BaseTableData>(
    initialOrderBy || headers[0]?.value,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const tableData = data.map((item) => createData(headers, item))

  const sortedData = tableData.slice().sort(getComparator(order, orderBy))

  const createSortHandler = (property: keyof BaseTableData) => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 587 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="base-table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.value}>
                  {header.value !== 'avatar' && (
                    <TableSortLabel
                      active={orderBy === header.value}
                      direction={orderBy === header.value ? order : 'asc'}
                      onClick={createSortHandler(header.value)}
                    >
                      {header.label}
                      {orderBy === header.value ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={Object.values(row).join('-')}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map(([key, value]) =>
                    key === 'avatar' ? (
                      <TableCell key={key}>
                        {value ? (
                          <Avatar alt="Avatar" src={value as string} />
                        ) : (
                          <Avatar
                            sx={{
                              bgcolor:
                                avatarColors[
                                  Math.floor(
                                    Math.random() * avatarColors.length,
                                  )
                                ],
                            }}
                          >
                            {(row.email as string)?.[0].toUpperCase() || '?'}
                          </Avatar>
                        )}
                      </TableCell>
                    ) : (
                      <TableCell key={key}>{renderCellValue(value)}</TableCell>
                    ),
                  )}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={headers.length}>
                Total: {tableData.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  )
}
