/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - title
 *         - nickname
 *         - date
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         nickname:
 *           type: string
 *           description: The nickname of the author
 *         date:
 *           type: Date
 *           format: date-time
 *           description: The date of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *       example:
 *         title: "My First Post"
 *         nickname: "john_doe"
 *         date: "2023-10-10T12:00:00Z"
 *         content: "This is the content of the post."
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: 전체 게시글 목록 조회
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 목록을 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       title:
 *                         type: string
 *                         example: "게시글 제목"
 *                       content:
 *                         type: string
 *                         example: "게시글 내용"
 *                       nickname:
 *                         type: string
 *                         example: "작성자 닉네임"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       503:
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "데이터 베이스 펑퍼ㅓㅇㅇ"
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: 게시글 작성
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "게시글 제목"
 *               content:
 *                 type: string
 *                 example: "게시글 내용"
 *     responses:
 *       200:
 *         description: 성공적으로 게시글이 작성
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     title:
 *                       type: string
 *                       example: "게시글 제목"
 *                     content:
 *                       type: string
 *                       example: "게시글 내용"
 *                     nickname:
 *                       type: string
 *                       example: "작성자 닉네임"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: 제목이나 내용 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errMessage:
 *                   type: string
 *                   example: "입력폼을 다 채워주세요"
 *
 *       401:
 *         description: 로그인 필요
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "로그인 하십셔"
 *
 *       502:
 *         description: 데이터베이스 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "입력 대 실패"
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: 게시글 조회
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     title:
 *                       type: string
 *                       example: "게시글 제목"
 *                     content:
 *                       type: string
 *                       example: "게시글 내용"
 *                     nickname:
 *                       type: string
 *                       example: "작성자 닉네임"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: 게시글이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "post 없음"
 *       502:
 *         description: 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "조 회 대 실 패"
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   patch:
 *     summary: 게시글 수정
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *       - in: body
 *         name: content
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *               example: "수정된 게시글 내용"
 *     responses:
 *       200:
 *         description: 성공적으로 게시글이 수정됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     title:
 *                       type: string
 *                       example: "게시글 제목"
 *                     content:
 *                       type: string
 *                       example: "수정된 게시글 내용"
 *                     nickname:
 *                       type: string
 *                       example: "작성자 닉네임"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       404:
 *         description: 닉네임이 일치하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "닉네임이 달라~~!"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "에러출동~~"
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 성공적으로 게시글이 삭제됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "success"
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "없는데 ??"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "에러출동~~"
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - nickname
 *         - date
 *         - content
 *         - postId
 *       properties:
 *         nickname:
 *           type: string
 *           description: The nickname of the author
 *         date:
 *           type: Date
 *           format: date-time
 *           description: The date of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         postId:
 *           type: string
 *           description: The ID of the related post
 *       example:
 *         nickname: "user123"
 *         date: "2023-10-10T12:00:00Z"
 *         content: "This is a comment."
 *         postId: "60d21b4667d0d8992e610c85"
 */

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: 게시글의 댓글 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 성공적으로 댓글을 조회함
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       content:
 *                         type: string
 *                         example: "댓글 내용"
 *                       nickname:
 *                         type: string
 *                         example: "작성자 닉네임"
 *                       postId:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "게시글이없다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "에러출동~~"
 */

/**
 * @swagger
 * /api/comments/{postId}:
 *   post:
 *     summary: 댓글 작성
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 ID
 *       - in: body
 *         name: content
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *               example: "댓글 내용"
 *         required: true
 *     responses:
 *       200:
 *         description: 성공적으로 댓글이 작성됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     content:
 *                       type: string
 *                       example: "댓글 내용"
 *                     nickname:
 *                       type: string
 *                       example: "작성자 닉네임"
 *                     postId:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: 내용을 적지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "입력 안한게 있네용"
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "터졌다네요"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "에러출동~~"
 */

/**
 * @swagger
 * /api/comments/{commentId}:
 *   patch:
 *     summary: 댓글 수정
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글 ID
 *       - in: body
 *         name: content
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *               example: "수정된 댓글 내용"
 *         required: true
 *     responses:
 *       200:
 *         description: 성공적으로 댓글이 수정됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     content:
 *                       type: string
 *                       example: "수정된 댓글 내용"
 *                     nickname:
 *                       type: string
 *                       example: "작성자 닉네임"
 *                     postId:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "댓글 내용 입력좀 or 니 글 아니잖아"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "에러가 나타났다"
 */

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: 댓글 ID
 *     responses:
 *       200:
 *         description: 성공적으로 댓글이 삭제됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     content:
 *                       type: string
 *                       example: "댓글 내용"
 *                     nickname:
 *                       type: string
 *                       example: "작성자 닉네임"
 *                     postId:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2021-06-22T14:00:00Z"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "댓글이 없다잉"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "에러가 나타났다"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - nickname
 *         - password
 *       properties:
 *         nickname:
 *           type: string
 *           description: The nickname of the author
 *         password:
 *           type: string
 *           description: The content of the post
 *       example:
 *         nickname: "안녕하세요"
 *         password: "하이바이마이"
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 사용자 회원가입
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               confirmPassword:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 성공적으로 회원가입됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                       example: "user123"
 *                 result:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: "Invalid nickname or password format"
 *                 errorMessage:
 *                   type: string
 *                   example: "중복된 닉네임입니당"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "가입실패 ㄲㅂ"
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 사용자 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 성공적으로 로그인됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 result:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: 잘못된 요청 또는 로그인 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "닉네임 패스워드 확인부탁 or 로그인 실패 ㅜㅜ"
 */
