/* React */
import { render, unmountComponentAtNode } from 'react-dom'
import Rtu      from 'react-addons-test-utils'
import React    from 'react'
/* Components to test */
import Element    from '../components/Element.js';
import Link       from '../components/Link.js';
import DirectLink from '../components/DirectLink.js';
import events     from '../mixins/scroll-events.js';
/* Test */
import expect   from 'expect'
import assert   from 'assert';


describe('Page', () => {
  
  let node = document.createElement('div');
  
  document.body.appendChild(node)

  let scrollDuration = 10;

  let component =
      <div>
        <ul>
          <li><Link to="test1" spy={true} smooth={true} duration={scrollDuration}>Test 1</Link></li>
          <li><Link to="test2" spy={true} smooth={true} duration={scrollDuration}>Test 2</Link></li>
          <li><Link to="test3" spy={true} smooth={true} duration={scrollDuration}>Test 3</Link></li>
          <li><Link to="test4" spy={true} smooth={true} duration={scrollDuration}>Test 4</Link></li>
          <li><Link to="test5" spy={true} smooth={true} duration={scrollDuration}>Test 5</Link></li>
          <li><DirectLink to="anchor" spy={true} smooth={true} duration={scrollDuration}>Test 6</DirectLink></li>
        </ul>
        <Element name="test1" className="element">test 1</Element>
        <Element name="test2" className="element">test 2</Element>
        <Element name="test3" className="element">test 3</Element>
        <Element name="test4" className="element">test 4</Element>
        <Element name="test5" className="element">test 5</Element>
        <div id="anchor" name="test6" className="element">test 6</div>
      </div>

  beforeEach(() => {
    events.scrollEvent.remove('begin');
    events.scrollEvent.remove('end');
  });

  afterEach(function () {
    unmountComponentAtNode(node)
  });
    
  it('renders six elements of link/element', (done) => {

    render(component, node, () => {

        var allLinks = node.querySelectorAll('a');
        var allTargets = node.querySelectorAll('.element');
        
        expect(allLinks.length).toEqual(6);
        expect(allTargets.length).toEqual(6);

        done();

    });

  })

  it('all targets has name and class', (done) => {

    render(component, node, () => {

        var allTargets = node.querySelectorAll('.element');
          
        [].forEach.call(allTargets, (element, i) => {
          expect(element.className).toEqual('element');
          expect(element.getAttribute('name')).toEqual('test' + ( i + 1 ));
        });

        done();

    });

  })

  it('it is at top in start', (done) => {
    expect(window.scrollY).toEqual(0);
    done();
  });

  it('is active when clicked', (done) => {
  expect(window.scrollY).toEqual(0);
    
    render(component, node, () => {

    expect(window.scrollY).toEqual(0);
        var link = node.querySelectorAll('a')[2];

        var target = node.querySelectorAll('.element')[2];

        var expectedScrollTo = target.getBoundingClientRect().top;

        Rtu.Simulate.click(link);

        /* Let it scroll, duration is based on param sent to Link */
        
        setTimeout(() => {

          expect(window.scrollY).toEqual(expectedScrollTo);

          expect(link.className).toEqual('active');

          done();

        }, scrollDuration + 50);

    });

  })

  it('is active when clicked to last (5) element', (done) => {
  expect(window.scrollY).toEqual(0);
    
    render(component, node, () => {
    expect(window.scrollY).toEqual(0);

        var link = node.querySelectorAll('a')[5];

        var target = node.querySelectorAll('.element')[5];

        var expectedScrollTo = target.getBoundingClientRect().top;

        Rtu.Simulate.click(link);

        // expect(target.getAttribute('name')).toEqual('test6');
        /* Let it scroll, duration is based on param sent to Link */
        
        setTimeout(() => {

          expect(window.scrollY).toEqual(expectedScrollTo);

          expect(link.className).toEqual('active');

          done();

        }, scrollDuration + 50);

    });

  })

});
