import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Todo from '@/components/Todo.vue'

describe('Todo.vue Unit Tests (Add, Filter, and Delete Flow)', () => {
    // This test checks that the input field is present
  it('Has an input field for adding todos', () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })

  // This test checks that the select dropdown for filtering is present
  it('Has a select dropdown for filtering todos', () => {
    const wrapper = mount(Todo)
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })
  
  // This test checks that the todo list is initially empty
  it('Has an empty todo list by default', () => {
    const wrapper = mount(Todo)
    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(0)
  })
  
  // This test checks that the input field cannot be empty when adding a todo
  it('Does not allow adding empty todos and return an error message', async () => {
  const wrapper = mount(Todo)
  const input = wrapper.find('input')

  await input.setValue('')
  await input.trigger('keydown.enter')

  // Assert that no todos were added
  const todos = wrapper.findAll('li')
  expect(todos).toHaveLength(0)

  // Assert that the error message is displayed
  const errorMsg = wrapper.find('.error')
  expect(errorMsg.exists()).toBe(true)
  expect(errorMsg.text()).toBe('Todo cannot be empty')
  })

//This test checks that items can be added to the todo list
  it('adds a todo to the list', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(1)
    expect(todos[0].text()).toContain('Read')
  })

// This test checks that multiple todos can be added to the list
  it('Adds multiple todos to the list', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    await input.setValue('Check Email')
    await input.trigger('keydown.enter')

    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(2)
    expect(todos[0].text()).toContain('Read')
    expect(todos[1].text()).toContain('Check Email')
  })

// This test checks that the todo list can be filtered by long length
  it('filters todos by long length (> 10 characters)', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Check Email')
    await input.trigger('keydown.enter')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    await wrapper.find('select').setValue('long')
    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(1)
    expect(todos[0].text()).toContain('Check Email')
  })

  // This test checks that the delete button is present for each todo item
  it('has a delete button for each todo item', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(1)

    // Check if the delete button exists
    const deleteButton = todos[0].find('button')
    expect(deleteButton.exists()).toBe(true)
  })

  // This test checks that clicking the delete button removes the todo item
  it('deletes a todo item when delete button is clicked', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(1)

    // Click the delete button
    const deleteButton = todos[0].find('button')
    await deleteButton.trigger('click')

    // Assert that the todo item is removed
    const updatedTodos = wrapper.findAll('li')
    expect(updatedTodos).toHaveLength(0)
  })
})