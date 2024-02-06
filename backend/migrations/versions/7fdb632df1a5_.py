"""empty message

Revision ID: 7fdb632df1a5
Revises: e11973522c9f
Create Date: 2024-01-26 14:11:32.962306

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7fdb632df1a5'
down_revision = 'e11973522c9f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('results',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('score', sa.Integer(), nullable=False),
    sa.Column('user_email', sa.String(length=150), nullable=False),
    sa.ForeignKeyConstraint(['user_email'], ['users.email'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    op.drop_table('results')
    # ### end Alembic commands ###
