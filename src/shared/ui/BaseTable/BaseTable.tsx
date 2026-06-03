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
  InputAdornment,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BaseInput } from '../BaseInput/BaseInput'
import SearchIcon from '@mui/icons-material/Search'

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
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [order, setOrder] = useState<Order>(initialOrder || 'asc')
  const [orderBy, setOrderBy] = useState<keyof BaseTableData>(
    initialOrderBy || headers[0]?.value,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const sortedTableEntries = data.slice().sort(getComparator(order, orderBy))

  const createSortHandler = (property: keyof BaseTableData) => () => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleRowClick = (userId: string) => {
    navigate(`/users/${userId}/profile`)
  }

  const filteredTableEntries = sortedTableEntries.filter((entry) =>
    Object.entries(entry).some(([, value]) =>
      String(value).includes(searchQuery),
    ),
  )

  const getAvatarColor = (id: string) => {
    let hash = 0

    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }

    return avatarColors[Math.abs(hash) % avatarColors.length]
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <BaseInput
          placeholder="Search"
          fullWidth={false}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
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
            {filteredTableEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headers.length}>No data found</TableCell>
              </TableRow>
            ) : null}
            {filteredTableEntries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id as string}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleRowClick(row.id as string)}
                >
                  {headers.map((header) => {
                    const value = row[header.value]

                    return (
                      <TableCell key={String(header.value)}>
                        {header.value === 'avatar' ? (
                          value ? (
                            <Avatar alt="Avatar" src={value as string} />
                          ) : (
                            <Avatar
                              sx={{
                                bgcolor: getAvatarColor(row.id as string),
                              }}
                            >
                              {(row.email as string)?.[0].toUpperCase() || '?'}
                            </Avatar>
                          )
                        ) : (
                          renderCellValue(value)
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={headers.length}>
                Total: {filteredTableEntries.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTableEntries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </Box>
  )
}
