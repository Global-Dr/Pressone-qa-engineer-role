import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Todo from '@/components/Todo.vue'

describe('Todo.vue Unit Tests (Add, Filter, and Delete Flow)', () => {
// This test checks that the todo list is empty when no todos are added
    it('submitting empty input as todo list', () => {
    const wrapper = mount(Todo)
    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(0)
  })
  
// This test checks that items can be added to the todo list
  it('adds todos to the list', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    await input.setValue('Check Email')
    await input.trigger('keydown.enter')

    await input.setValue('Go Market')
    await input.trigger('keydown.enter')

    const todos = wrapper.findAll('li')
    expect(todos).toHaveLength(3)
    const todoTexts = todos.map(t => t.text())
    expect(todoTexts).toEqual(expect.arrayContaining(['Read', 'Check Email', 'Go Market']))
  })

// This test checks that the todo list can be filtered by short length
  it('filters todos by short length (≤ 10 characters)', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    await input.setValue('Check Email')
    await input.trigger('keydown.enter')

    await input.setValue('Go Market')
    await input.trigger('keydown.enter')

    await wrapper.find('select').setValue('short')
    const todos = wrapper.findAll('li')
    const shortTexts = todos.map(t => t.text())
    expect(shortTexts).toEqual(expect.arrayContaining(['Read', 'Go Market']))
    expect(shortTexts).not.toContain('Check Email')
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

// This test checks that a todo item can be deleted from the list
  it('deletes a todo from the list', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')

    await input.setValue('Read')
    await input.trigger('keydown.enter')

    await input.setValue('Check Email')
    await input.trigger('keydown.enter')

    let todos = wrapper.findAll('li')
    expect(todos).toHaveLength(2)

    // Delete "Read"
    const readItem = todos.find(item => item.text().includes('Read'))
    await readItem.find('button').trigger('click')

    todos = wrapper.findAll('li')
    const remaining = todos.map(t => t.text())
    expect(todos).toHaveLength(1)
    expect(remaining).not.toContain('Read')
  })
})