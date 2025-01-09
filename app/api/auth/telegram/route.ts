import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../database';
import { User } from '../../../../database/models/User';

export async function POST(request: Request) {
  try {
    // Add logging for debugging
    console.log('Received request to save user data');
    
    await connectToDatabase();
    console.log('Connected to database');

    const body = await request.json();
    console.log('Received user data:', body);

    const { 
      id, 
      username, 
      photoUrl, 
      type, 
      title,
      firstName,
      lastName,
      isBot,
      isPremium,
      languageCode,
      allowsWriteToPm,
      addedToAttachmentMenu
    } = body;

    if (!id || !type) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update or create user with more detailed error handling
    try {
      const user = await User.findOneAndUpdate(
        { telegramId: id.toString() },  // Convert id to string if it's a number
        {
          telegramId: id.toString(),
          username: username || null,
          firstName: firstName || null,
          lastName: lastName || null,
          photoUrl: photoUrl || null,
          type,
          title: title || null,
          isBot: isBot || false,
          isPremium: isPremium || null,
          languageCode: languageCode || null,
          allowsWriteToPm: allowsWriteToPm || null,
          addedToAttachmentMenu: addedToAttachmentMenu || null,
        },
        { 
          upsert: true, 
          new: true,
          runValidators: true 
        }
      );

      console.log('User saved successfully:', user);
      return NextResponse.json(user);
    } catch (dbError: any) {
      console.error('Database operation failed:', dbError);
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in Telegram auth:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}