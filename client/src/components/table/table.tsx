import * as React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import MaterialTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import {connect} from 'react-redux'
import {loadRecords} from '../../ac/table'
import Alert from '@material-ui/lab/Alert'

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

class Table extends React.Component {
    props: any;

    async componentDidMount(): Promise<void> {
        const {loadRecords} = this.props
        loadRecords()
    }

    render(): React.ReactNode {
        const {table} = this.props
        if(table.loaded === false) {
            if(table.error) {
               return (<Alert severity="error">{table.error}</Alert>)
            }
            return (<div>Loading ...</div>)
        }
        return (
            <div className="App">
                <div>{ table.error === 'Error: Limit reached' && <Alert severity="error">limit reached</Alert> }</div>
                <div>{ table.error && table.error !== 'Error: Limit reached' && <Alert severity="error">connection error</Alert> }</div>
                <TableContainer component={Paper}>
                    <MaterialTable aria-label="simple table">
                        <TableBody>
                            {table.entities.map((row:any, index:number) => {
                                return <StyledTableRow key={index}><StyledTableCell>{row}</StyledTableCell></StyledTableRow>;
                            })}
                        </TableBody>
                    </MaterialTable>
                </TableContainer>
            </div>
        );
    }
}

export default connect(    (state: any): any => {
    return {
        table: state.table,
    };
}, {loadRecords})(Table)
