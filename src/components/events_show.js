import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { getEvent, deleteEvent, putEvent } from '../actions'

class EventsShow extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {this.props.getEvent(id)}
  }
  renderField(field) {
    const { input, label, type, meta: {touched, error} } = field

    return(
      <div>
        <input {...input} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
  async onSubmit(values){
    await this.props.putEvent(values)
    this.props.history.push('/')
  }

  async onDeleteClick(){
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  render(){
    const { handleSubmit, pristine, submitting, invalid } = this.props
    return(
      <>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field label='Title' name='title' type='text' component={this.renderField} />
            <Field label='Body' name='body' type='text' component={this.renderField} />
          </div>
          <div>
            <input type='submit' disabled={pristine || submitting || invalid} value='submit' />
            <Link to='/'>CANCEL</Link>
            <Link to='/' onClick={this.onDeleteClick}>DELETE</Link>
          </div>
        </form>
      </>
    )
  }

}
const validate = values => {
  const errors = {}

  if(!values.title)errors.title = 'titleを入力してください'
  if(!values.body)errors.body = 'bodyを入力してください'

  return errors
}
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return {initialValues: event, event}
}
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)
