import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeDescription, add, search } from './todoActions'

class TodoFrom extends Component {
  constructor(props) {
    super(props)
    this.keyHandler = this.keyHandler.bind(this)
  }

  keyHandler(e) {
    const { add, search, description } = this.props
    if (e.key == 'Enter') {
      e.shiftKey ? search() : add()
    } else if(e.key == 'Escape') {
      props.handleClear()
    }
  }

  componentWillMount() {
    this.props.search()
  }

  render () {
    const { add, search, description } = this.props
    return (
      <div role="form" className="todoForm">

        <Grid cols="12 9 10">
          <input id="description" className="form-control"
            placeholder="Adicione uma tarefa"
            value={this.props.description}
            onChange={this.props.changeDescription}
            onKeyUp={this.keyHandler}/>
        </Grid>

        <Grid cols="12 3 2">
          <IconButton style="primary" icon="plus" onClick={() => add(description)} />
          <IconButton style="info" icon="search" onClick={() => search()} />
          <IconButton style="default" icon="close" onClick={this.props.handleClear} />
        </Grid>

      </div>
    )
  }
}


const mapStateToProps = state => ({
  description: state.todo.description
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDescription, add, search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoFrom)
