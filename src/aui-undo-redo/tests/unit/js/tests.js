YUI.add('aui-undo-redo-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-undo-redo');

    suite.add(new Y.Test.Case({
        name: 'Undo/Redo states',

        setUp: function() {
            this.reset();
        },

        'should undo and redo the last state': function() {
            this.undoRedo.add(this.newWriteState('Hello'));
            this.undoRedo.add(this.newWriteState(' World'));
            this.undoRedo.add(this.newWriteState(' !!!'));

            this.undoRedo.undo();
            Y.Assert.areEqual('Hello World', this.string);

            this.undoRedo.undo();
            Y.Assert.areEqual('Hello', this.string);

            this.undoRedo.redo();
            Y.Assert.areEqual('Hello World', this.string);
        },

        'should return false when undo/redo can\'t be done': function() {
            this.undoRedo.add(this.newWriteState('Hello'));

            Y.Assert.isTrue(this.undoRedo.undo());
            Y.Assert.isFalse(this.undoRedo.undo());

            Y.Assert.isTrue(this.undoRedo.redo());
            Y.Assert.isFalse(this.undoRedo.redo());
        },

        'should clear history correctly': function() {
            this.undoRedo.add(this.newWriteState('Hello'));
            this.undoRedo.add(this.newWriteState(' World'));

            Y.Assert.isTrue(this.undoRedo.undo());

            this.undoRedo.clearHistory();
            Y.Assert.isFalse(this.undoRedo.undo());
            Y.Assert.isFalse(this.undoRedo.redo());
        },

        'should check correctly if can undo/redo': function() {
            Y.Assert.isFalse(this.undoRedo.canUndo());
            Y.Assert.isFalse(this.undoRedo.canRedo());

            this.undoRedo.add(this.newWriteState('Hello'));
            this.undoRedo.add(this.newWriteState(' World'));
            Y.Assert.isTrue(this.undoRedo.canUndo());
            Y.Assert.isFalse(this.undoRedo.canRedo());

            this.undoRedo.undo();
            Y.Assert.isTrue(this.undoRedo.canUndo());
            Y.Assert.isTrue(this.undoRedo.canRedo());

            this.undoRedo.undo();
            Y.Assert.isFalse(this.undoRedo.canUndo());
            Y.Assert.isTrue(this.undoRedo.canRedo());
        },

        'should allow user to see the undo/redo states': function() {
            var state1 = this.newWriteState('Hello'),
                state2 = this.newWriteState(' World');

            Y.Assert.isUndefined(this.undoRedo.undoPeek());
            Y.Assert.isUndefined(this.undoRedo.redoPeek());

            this.undoRedo.add(state1);
            this.undoRedo.add(state2);
            Y.Assert.areSame(state2, this.undoRedo.undoPeek());
            Y.Assert.isUndefined(this.undoRedo.redoPeek());

            this.undoRedo.undo();
            Y.Assert.areSame(state1, this.undoRedo.undoPeek());
            Y.Assert.areSame(state2, this.undoRedo.redoPeek());

            this.undoRedo.undo();
            Y.Assert.isUndefined(this.undoRedo.undoPeek());
            Y.Assert.areSame(state1, this.undoRedo.redoPeek());
        },

        'should clean redo stack when new state is added': function() {
            this.undoRedo.add(this.newWriteState('Hello'));
            this.undoRedo.add(this.newWriteState(' World'));

            // Action 'World' is undone here.
            this.undoRedo.undo();
            Y.Assert.areEqual('Hello', this.string);

            this.undoRedo.add(this.newWriteState(' Earth'));

            // The state that adds ' World' can't be redone anymore
            // since the ' Earth' state was added in its place.
            Y.Assert.isFalse(this.undoRedo.redo());

            this.undoRedo.undo();
            Y.Assert.areEqual('Hello', this.string);
            this.undoRedo.redo();
            Y.Assert.areEqual('Hello Earth', this.string);
        },

        'should throw error on invalid states': function() {
            var instance = this;
            YUITest.Assert.throwsError(Error, function(){
                instance.undoRedo.add({});
            });
        },

        'should respect the max undo depth option': function() {
            this.undoRedo.set('maxUndoDepth', 2);

            this.undoRedo.add(this.newWriteState('Hello'));
            this.undoRedo.add(this.newWriteState(' World'));
            this.undoRedo.add(this.newWriteState('!!!'));

            this.undoRedo.undo();
            Y.Assert.isTrue(this.undoRedo.canUndo());
            this.undoRedo.undo();
            Y.Assert.isFalse(this.undoRedo.canUndo());
            Y.Assert.areEqual('Hello', this.string);
        },

        'should respect dynamic changes to the max undo depth option': function() {
            this.undoRedo.add(this.newWriteState('Hello'));
            this.undoRedo.add(this.newWriteState(' World'));
            this.undoRedo.add(this.newWriteState('!!!'));

            this.undoRedo.set('maxUndoDepth', 2);

            this.undoRedo.undo();
            Y.Assert.isTrue(this.undoRedo.canUndo());
            this.undoRedo.undo();
            Y.Assert.isFalse(this.undoRedo.canUndo());
            Y.Assert.areEqual('Hello', this.string);
        },

        'should handle async undo/redo actions': function() {
            var instance = this;

            // Add both async and sync states.
            this.undoRedo.add(this.newWriteState('Hello', true));
            this.undoRedo.add(this.newWriteState(' World'));
            this.undoRedo.add(this.newWriteState(' !!!', true));

            this.undoRedo.undo();
            this.undoRedo.undo();
            this.undoRedo.undo();
            this.undoRedo.redo();

            // Only one undo state call should have been made, since the others
            // should be pending on its promise to end.
            Y.Assert.areEqual('Hello World !!!', this.string);
            this.assertUndoCalled(1);
            this.assertRedoCalled(0);

            // Make sure that undo/redo actions are only called after the previous
            // action ends.
            this.waitForUndoEnd(function() {
                Y.Assert.areEqual('Hello World', instance.string);

                instance.waitForUndoEnd(function() {
                    Y.Assert.areEqual('Hello', instance.string);
                    instance.assertUndoCalled(2);
                    instance.assertRedoCalled(0);

                    instance.waitForUndoEnd(function() {
                        Y.Assert.areEqual('', instance.string);
                        instance.assertUndoCalled(3);
                        instance.assertRedoCalled(0);

                        instance.waitForRedoEnd(function() {
                            Y.Assert.areEqual('Hello', instance.string);
                            instance.assertUndoCalled(3);
                            instance.assertRedoCalled(1);
                        });
                    });
                });
            });
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test', 'aui-undo-redo', 'tests-aui-undo-redo-utils' ] });