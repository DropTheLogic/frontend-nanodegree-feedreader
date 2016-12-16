/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        // Each test must pass these expectations
        beforeEach(function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        it('are defined', function() {
            // Must only pass the beforeEach expectations!
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        // In addition to the beforeEach expectations:
        it('have urls defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain("http");
            });
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        // In addition to the beforeEach expectations:
        it('have names defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
                expect(feed.name).not.toBeNull();
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
            expect($('body')[0].classList).toContain('menu-hidden');
         });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            // Simulate click
            $('.menu-icon-link').click();
            expect($('body')[0].classList).not.toContain('menu-hidden');
            // Simulate click back
            $('.menu-icon-link').click();
            expect($('body')[0].classList).toContain('menu-hidden');
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        // Load in feed before running test
        beforeEach(function(done) {
            if (allFeeds.length > 0) {
                loadFeed(0, done);
            }
            else {
                done();
            }
         });

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('are created within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        // Array to hold feed outputs
        let feedOutputs = [];

        // Load two feeds, and store the outputs in feedOutputs array
        beforeEach(function(done) {
            // Ensure there are at least two feeds to load
            if (allFeeds.length > 1) {
                // Load first feed
                loadFeed(0, function() {
                    // Push first output to array
                    feedOutputs.push($('.feed')[0].innerHTML);
                    // Load second array
                    loadFeed(1, function() {
                        // Add second output to array
                        feedOutputs.push($('.feed')[0].innerHTML);
                        done();
                    });
                });
            }
            else {
                done();
            }
        });

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('loads different content', function() {
            expect(feedOutputs[0]).not.toBe(feedOutputs[1]);
        });
    });

}());
