import * as React from 'react'
import InputUi from '@material-ui/core/Input'
import './input.css'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {addRecord} from '../../ac/table'
class Input extends React.Component {
    props: any;
    state = {
        input: '',
        error: false
    }
    addRow = async () => {
        if(!this.state.input) {
            this.setState({
                error: true
            })
            return;
        }
        const {addRecord} = this.props
        addRecord(this.state.input)
        this.setState({
            error: false,
            input: ''
        })
    }
    onChange = (e: any) => {
        this.setState({
            input: e.target.value,
        });
    }
    render(): React.ReactNode {
        return (
            <div className='inputWrapper'>
                {this.state.error && <InputUi onChange={this.onChange} value={this.state.input} error />}
                {!this.state.error && <InputUi onChange={this.onChange} value={this.state.input}/>}
                <div onClick={this.addRow}>
                    <Button
                        variant='contained'
                        color='primary'
                    >Add record
                    </Button>
                </div>
            </div>);
    }
}

export default connect(null, {addRecord})(Input)
