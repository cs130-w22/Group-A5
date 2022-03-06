const express = require('express');
var chai = require('chai');
const request = require('supertest');

const app = express();
const numTrials = 10;

describe('Create New Session', () => {
	it('should create a new key-value pair in the Map, with a unique code', () => {
		var new_code;
		let codes = [0000];

		for(var i = 0; i < numTrials; i++) {
			request(app)
                	.get('new_session')
                	.then((res) => {
                        	let new_code = res.code;
				expect(codes).to.not.include(res.code);
				codes.push(new_code);
                        	expect(res.code).to.be.an('int');
                	});

                	request(app)
                	.get('session_list')
                	.then((res) => {
                        	expect(res.code_list.slice(-1)).to.be.eql(new_code);
                	});
		}
	});
});

describe('Join Session', () => {
	var new_code;
	let codes = [0000];

	it('should create a session to test the functionality within', () => {
		request(app)
                .get('new_session')
                .then((res) => {
                        let new_code = res.code;
                        expect(codes).to.not.include(res.code);
                        codes.push(new_code);
                        expect(res.code).to.be.an('int');
                });

                request(app)
                .get('session_list')
                .then((res) => {
                        expect(res.code_list.slice(-1).to.be.eql(new_code));
                });
	});

	it('should successfully let users join existing sessions', () => {
		request(app)
		.post('session/join')
		.send({"c": new_code, "n": "Keshav"})
		.then((res) => {
			expect(res.status.to.be.eql(0));
			expect(res.message.to.have.string('User added to session'));
		});
	});

	it('should have the added user in the user list for the given session', () => {
		request(app)
		.get('session/users')
		.then((res) => {
			expect(res.status.to.be.eql(0));
			expect(res.users.slice(-1).to.have.string('Keshav'));
		});
	});
});

describe('Add Song', () => {
	var new_code;
	let codes = [0000];
	it('should create a session to test the functionality within', () => {
		request(app)
                .get('new_session')
                .then((res) => {
                        let new_code = res.code;
                        expect(codes).to.not.include(res.code);
                        codes.push(new_code);
                        expect(res.code).to.be.an('int');
                });

                request(app)
                .get('session_list')
                .then((res) => {
                        expect(res.code_list.slice(-1).to.be.eql(new_code));
                });
	});

	it('should add a song to the playlist for the given session', () => {
		request(app)
		.post('session/add_song')
		.send({"c": new_code, "n": "Keshav", "sid": "spotify:track:6IwKcFdiRQZOWeYNhUiWIv"})
		.then((res) => {
			expect(res.status.to.be.eql(0));
			expect(res.message.to.have.string('Song spotify:track:6IwKcFdiRQZOWeYNhUiWIv added to session '));
		});
	});

	it('should have the added song in the session Map', () => {
		request(app)
		.get('session/playlist')
		.then((res) => {
			expect(res.status.to.be.eql(0));
			expect(res.songs.slice(-1).to.have.string('spotify:track:6IwKcFdiRQZOWeYNhUiWIv'));
		});
	});

	it('should not add duplicate songs to the playlist', () => {
		request(app)
		.post('session/add_song')
                .send({"c": new_code, "n": "Keshav", "sid": "spotify:track:6IwKcFdiRQZOWeYNhUiWIv"})
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.message.to.have.string('Song spotify:track:6IwKcFdiRQZOWeYNhUiWIv already added to session '));
                });
	});
});

describe('Upvote', () => {
        var new_code;
        let codes = [0000];
        it('should create a session to test the functionality within', () => {
                request(app)
                .get('new_session')
                .then((res) => {
                        let new_code = res.code;
                        expect(codes).to.not.include(res.code);
                        codes.push(new_code);
                        expect(res.code).to.be.an('int');
                });

                request(app)
                .get('session_list')
                .then((res) => {
                        expect(res.code_list.slice(-1).to.be.eql(new_code));
                });
        });

        it('should add a song to the playlist for the given session', () => {
                request(app)
                .post('session/add_song')
                .send({"c": new_code, "n": "Keshav", "sid": "spotify:track:6IwKcFdiRQZOWeYNhUiWIv"})
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.message.to.have.string('Song spotify:track:6IwKcFdiRQZOWeYNhUiWIv added to session '));
                });
        });

        it('should have the added song in the session Map with exactly 1 upvote', () => {
                request(app)
                .get('session/playlist')
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.songs.slice(-1).sid.to.have.string('spotify:track:6IwKcFdiRQZOWeYNhUiWIv'));
                        expect(res.songs.slice(-1).upvotes.to.be.eql(1));
                });
        });

        it('should have the added song in the session Map with exactly 1 upvote', () => {
                request(app)
                .get('session/playlist')
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.songs.slice(-1).sid.to.have.string('spotify:track:6IwKcFdiRQZOWeYNhUiWIv'));
                        expect(res.songs.slice(-1).upvotes.to.be.eql(1));
                });
        });
	
	it('should remove the upvote if the same user tries to upvote that song', () => {
                request(app)
                .post('session/upvote')
                .send({"c": new_code, "n": "Keshav", "sid": "spotify:track:6IwKcFdiRQZOWeYNhUiWIv"})
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.message.to.have.string('downvoted'));
                });
        });

        it('should have the updated Map with 0 upvotes for that song', () => {
                request(app)
                .get('session/playlist')
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.songs.slice(-1).sid.to.have.string('spotify:track:6IwKcFdiRQZOWeYNhUiWIv'));
                        expect(res.songs.slice(-1).upvotes.to.be.eql(0));
                });
        });

        it('should allow another user to join the session', () => {
                request(app)
                .post('session/join')
                .send({"c": new_code, "n": "Polat"})
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.message.to.have.string('User added to session'));
                });
        });

        it('should allow that user to then upvote the already existing song in the playlist', () => {
                request(app)
                .post('session/upvote')
                .send({"c": new_code, "n": "Polat", "sid": "spotify:track:6IwKcFdiRQZOWeYNhUiWIv"})
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.message.to.have.string('upvoted'));
                });
        });

        it('should have the added song in the session Map with exactly 1 upvote', () => {
                request(app)
                .get('session/playlist')
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.songs.slice(-1).sid.to.have.string('spotify:track:6IwKcFdiRQZOWeYNhUiWIv'));
                        expect(res.songs.slice(-1).upvotes.to.be.eql(1));
                });
        });

	it('should allow the original user to reupvote the song', () => {
                request(app)
                .post('session/upvote')
                .send({"c": new_code, "n": "Keshav", "sid": "spotify:track:6IwKcFdiRQZOWeYNhUiWIv"})
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.message.to.have.string('upvoted'));
                });
        });

        it('should have the added song in the session Map with exactly 2 upvotes', () => {
                request(app)
                .get('session/playlist')
                .then((res) => {
                        expect(res.status.to.be.eql(0));
                        expect(res.songs.slice(-1).sid.to.have.string('spotify:track:6IwKcFdiRQZOWeYNhUiWIv'));
                        expect(res.songs.slice(-1).upvotes.to.be.eql(2));
                });
        });
});
