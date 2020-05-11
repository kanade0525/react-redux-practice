import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { postEvent } from '../actions'

class EventsNew extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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
    await this.props.postEvent(values)
    this.props.history.push('/')
  }

  render(){
    const { handleSubmit, pristine, submitting } = this.props
    return(
      <>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field label='Title' name='title' type='text' component={this.renderField} />
            <Field label='Body' name='body' type='text' component={this.renderField} />
          </div>
          <div>
            <input type='submit' disabled={pristine || submitting} value='submit' />
            <Link to='/'>CANCEL</Link>
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
const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
