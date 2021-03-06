import React, { Component } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NewPost from '../src/newPost';
import { WebSocket } from 'mock-socket';
global.WebSocket = WebSocket;

describe("<NewPost />", () => {

  test("renders a form for user to create a new post", () => {
      const renderer = new ShallowRenderer();
      renderer.render(<NewPost />);
      const result = renderer.getRenderOutput();
      expect(result.props.children.type).toBe('form');
  });

  describe('#onChange', () => {
    test('updates state attributes', () => {
      const getActiveFeed = jest.fn()
      const wrapper = mount(<NewPost getActiveFeed={getActiveFeed}/> );      
      wrapper.find('#title').get(0).props.onChange({target: {name: "title", value: "First post title"}})
      wrapper.find('#text').get(0).props.onChange({target: {name: "text", value: "First post text"}})
      expect(wrapper.state().title).toBe('First post title');
      expect(wrapper.state().text).toBe('First post text');
    });
  });

  describe("#OnSubmit", () => {
    test("it prevents page from reloading and calls userPost function", () => {
      const addPost = jest.fn();
      const wrapper = mount(<NewPost addPost={addPost}/>);
      const preventDefault = jest.fn();
      wrapper.find('form').first().simulate('submit', {preventDefault});
      expect(preventDefault).toHaveBeenCalled();
      expect(addPost).toHaveBeenCalled();
    });
  });
});
