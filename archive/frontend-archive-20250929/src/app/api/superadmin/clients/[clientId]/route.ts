import { NextRequest, NextResponse } from 'next/server';

// GET /api/superadmin/clients/[clientId] - Get specific client details
export async function GET(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  try {
    const { clientId } = params;
    
    // In production, this would fetch from your database
    const mockClient = {
      id: clientId,
      name: "TechCorp Solutions",
      email: "admin@techcorp.com",
      plan: "pro",
      employees: "75",
      industry: "Technology",
      status: "active",
      lastActive: "2 hours ago",
      mrr: 79,
      createdAt: new Date().toISOString(),
      strategy: "Build innovative software products that transform business operations",
      vision: "To be the leading technology solutions provider",
      mission: "Empower businesses with cutting-edge technology",
      values: "Innovation, Excellence, Collaboration, Integrity"
    };

    return NextResponse.json({
      success: true,
      client: mockClient
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}